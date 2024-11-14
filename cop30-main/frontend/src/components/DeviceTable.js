import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import "./DeviceTable.css"

const DeviceTable = ({ devices, setDevices }) => {
  const diasNoMes = 30;

  const removeDeviceFromFirestore = async (deviceId) => {
    const user = auth.currentUser;
    if (user && deviceId) {
      const uid = user.uid;
      try {
        const deviceRef = doc(db, 'users', uid, 'devices', deviceId);
        await deleteDoc(deviceRef);
        console.log('Dispositivo removido do Firestore com sucesso');
      } catch (error) {
        console.error('Erro ao remover o dispositivo do Firestore:', error);
      }
    } else {
      console.error('Usuário não autenticado ou deviceId indefinido.');
    }
  };

  const handleRemoveDevice = async (index, deviceId) => {
    if (deviceId) {
      const user = auth.currentUser;
      if (user) {
        try {
          await removeDeviceFromFirestore(deviceId);
          const newDevices = devices.filter((_, i) => i !== index);
          setDevices(newDevices);
        } catch (error) {
          console.error('Erro ao remover o dispositivo:', error);
        }
      }
    }
  };

  return (
    <div className="device-table">
      {/* Contêiner com rolagem lateral */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Potência (W/h)</th>
              <th>Tempo de uso</th>
              <th>Quantidade</th>
              <th>Custo médio no mês (R$)</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {devices.length > 0 ? (
              devices.map((device, index) => {
                let horasUso;
                if (device.unidade_tempo === 'minutos') {
                  horasUso = device.tempo_uso / 60;
                } else {
                  horasUso = device.tempo_uso;
                }

                const consumoKwhDiario = (device.potencia * horasUso * device.quantidade) / 1000;
                const consumoMensalKwh = consumoKwhDiario * diasNoMes;
                const custo = consumoMensalKwh * 0.93845;

                return (
                  <tr key={index}>
                    <td>{device.dispositivo}</td>
                    <td>{device.potencia}</td>
                    <td>{device.tempo_uso} {device.unidade_tempo === 'minutos' ? 'min/dia' : 'horas/dia'}</td>
                    <td>{device.quantidade}</td>
                    <td>{custo.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleRemoveDevice(index, device.id)}>X</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Nenhum dispositivo adicionado ainda</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Para telas pequenas, exibe a versão de lista ou cartões */}
      <div className="device-list-mobile">
        {devices.map((device, index) => {
          let horasUso;
          if (device.unidade_tempo === 'minutos') {
            horasUso = device.tempo_uso / 60;
          } else {
            horasUso = device.tempo_uso;
          }

          const consumoKwhDiario = (device.potencia * horasUso * device.quantidade) / 1000;
          const consumoMensalKwh = consumoKwhDiario * diasNoMes;
          const custo = consumoMensalKwh * 0.93845;

          return (
            <div className="device-card" key={index}>
              <p><strong>Dispositivo:</strong> {device.dispositivo}</p>
              <p><strong>Potência (W/h):</strong> {device.potencia}</p>
              <p><strong>Tempo de Uso:</strong> {device.tempo_uso} {device.unidade_tempo === 'minutos' ? 'min/dia' : 'horas/dia'}</p>
              <p><strong>Quantidade:</strong> {device.quantidade}</p>
              <p><strong>Custo médio no mês (R$):</strong> {custo.toFixed(2)}</p>
              <button onClick={() => handleRemoveDevice(index, device.id)}>Remover</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceTable;
