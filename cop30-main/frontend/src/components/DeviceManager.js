import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DeviceManager.css';

const DeviceManager = ({ onClose }) => {
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  const fetchRoomsAndDevices = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        const roomsSnapshot = await getDocs(collection(db, 'users', uid, 'rooms'));
        const fetchedRooms = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          devices: doc.data().devices || [],
        }));
        setRooms(fetchedRooms);

        const alocados = fetchedRooms.flatMap((room) => room.devices.map((device) => device.id));
        const devicesSnapshot = await getDocs(collection(db, 'users', uid, 'devices'));
        const fetchedDevices = devicesSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((device) => !alocados.includes(device.id));

        setDevices(fetchedDevices);
      } catch (error) {
        console.error('Erro ao buscar dispositivos e cômodos:', error);
      }
    }
  };

  useEffect(() => {
    fetchRoomsAndDevices();
  }, []);

  const addRoom = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const newRoom = { name: `Room ${rooms.length + 1}`, devices: [] };
      const roomRef = await addDoc(collection(db, 'users', uid, 'rooms'), newRoom);
      setRooms([...rooms, { ...newRoom, id: roomRef.id }]);
    }
  };

  const deleteRoom = async (roomId) => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      try {
        // Encontra os dispositivos do cômodo que será excluído
        const roomToDelete = rooms.find((room) => room.id === roomId);
        const devicesToReassign = roomToDelete?.devices || [];
  
        // Exclui o cômodo
        await deleteDoc(doc(db, 'users', uid, 'rooms', roomId));
        const updatedRooms = rooms.filter((room) => room.id !== roomId);
        setRooms(updatedRooms);
  
        // Reatribui dispositivos do cômodo excluído à lista principal
        setDevices((prevDevices) => [...prevDevices, ...devicesToReassign]);
  
        // Atualiza os dispositivos no banco de dados
        await fetchRoomsAndDevices();
  
        console.log(`Cômodo ${roomId} excluído com sucesso.`);
      } catch (error) {
        console.error('Erro ao excluir cômodo:', error);
      }
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    // Se não foi arrastado para um destino válido
    if (!destination) return;

    // Se o local de origem e destino são os mesmos, não faz nada
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    let movedDevice;
    if (sourceId === 'devices') {
      // Remover dispositivo da lista de dispositivos
      movedDevice = devices[source.index];
      setDevices(devices.filter((_, idx) => idx !== source.index));
    } else {
      // Remover dispositivo do cômodo de origem
      const sourceRoom = rooms.find((room) => room.id === sourceId);
      movedDevice = sourceRoom.devices[source.index];
      const updatedRooms = rooms.map((room) =>
        room.id === sourceId ? { ...room, devices: room.devices.filter((_, idx) => idx !== source.index) } : room
      );
      setRooms(updatedRooms);

      // Atualizar banco de dados para remover dispositivo do cômodo
      try {
        const user = auth.currentUser;
        if (user) {
          const roomRef = doc(db, 'users', user.uid, 'rooms', sourceId);
          await updateDoc(roomRef, { devices: updatedRooms.find((room) => room.id === sourceId).devices });
          console.log(`Dispositivo removido de ${sourceId} no banco de dados.`);
        }
      } catch (error) {
        console.error('Erro ao atualizar o banco de dados:', error);
      }
    }

    if (destinationId === 'devices') {
      // Adicionar dispositivo de volta à lista de dispositivos
      setDevices([...devices, movedDevice]);
    } else {
      // Adicionar dispositivo ao cômodo de destino
      const updatedRooms = rooms.map((room) =>
        room.id === destinationId ? { ...room, devices: [...room.devices, movedDevice] } : room
      );
      setRooms(updatedRooms);

      // Atualizar banco de dados para adicionar dispositivo ao cômodo
      try {
        const user = auth.currentUser;
        if (user) {
          const roomRef = doc(db, 'users', user.uid, 'rooms', destinationId);
          await updateDoc(roomRef, { devices: updatedRooms.find((room) => room.id === destinationId).devices });
          console.log(`Dispositivo adicionado a ${destinationId} no banco de dados.`);
        }
      } catch (error) {
        console.error('Erro ao atualizar o banco de dados:', error);
      }
    }
  };

  const renameRoom = async (roomId, newName) => {
    const updatedRooms = rooms.map((r) => (r.id === roomId ? { ...r, name: newName } : r));
    setRooms(updatedRooms);

    const user = auth.currentUser;
    if (user) {
      const roomRef = doc(db, 'users', user.uid, 'rooms', roomId);
      await updateDoc(roomRef, { name: newName });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="device-manager-overlay">
        <div className="device-manager">
          <button className="close-device-manager-button" onClick={onClose}>
            X Fechar
          </button>
          <button onClick={addRoom} className="add-room-button">
            + Adicionar Cômodo
          </button>

          <h2>Dispositivos</h2>
          <Droppable droppableId="devices">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="device-list"
              >
                {devices.map((device, index) => (
                  <Draggable key={device.id} draggableId={device.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="device"
                      >
                        {device.dispositivo}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <h2>Cômodos</h2>
          <div className="room-list">
            {rooms.map((room) => (
              <Droppable key={room.id} droppableId={room.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="room"
                  >
                    <div className="room-header">
                      {editingRoom === room.id ? (
                        <input
                          type="text"
                          defaultValue={room.name}
                          onBlur={(e) => {
                            renameRoom(room.id, e.target.value);
                            setEditingRoom(null);
                          }}
                          autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => setEditingRoom(room.id)}>{room.name}</span>
                      )}
                      <div className="room-actions">
                        <button
                          className="edit-room-button"
                          onClick={() => setEditingRoom(room.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="delete-room-button"
                          onClick={() => deleteRoom(room.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                    <div className="room-devices">
                      {room.devices.map((device, index) => (
                        <Draggable key={device.id} draggableId={device.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="room-device"
                            >
                              {device.dispositivo}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default DeviceManager;
