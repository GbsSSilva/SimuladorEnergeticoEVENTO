import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import './Room.css';

const Room = ({ room, devicesInRoom, onDropDevice, onRemoveDevice, onRenameRoom, onDeleteRoom }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(room.name);

  const [{ isOver }, drop] = useDrop({
    accept: 'DEVICE',
    drop: (item) => onDropDevice(item.id, room.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleSaveName = () => {
    if (newName.trim() === '') {
      setNewName(room.name); // Voltar ao nome original se o campo estiver vazio
    } else if (newName !== room.name) {
      onRenameRoom(room.id, newName); // Atualizar o nome apenas se for diferente
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={drop}
      className={`room ${isOver ? 'room-hover' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="room-header">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveName();
              if (e.key === 'Escape') {
                setIsEditing(false);
                setNewName(room.name); // Cancelar edição e voltar ao nome original
              }
            }}
            autoFocus
            className="edit-room-input"
          />
        ) : (
          <h3 onDoubleClick={() => setIsEditing(true)}>{room.name}</h3>
        )}
        <div className="room-actions">
          <button className="edit-room-button" onClick={() => setIsEditing(true)}>
            Editar
          </button>
          <button className="delete-room-button" onClick={() => onDeleteRoom(room.id)}>
            Excluir
          </button>
        </div>
      </div>
      <div className="room-devices">
        {devicesInRoom.map((device) => (
          <motion.div
            key={device.id}
            className="room-device"
            layout
            whileHover={{ scale: 1.1 }}
            onClick={() => onRemoveDevice(device.id, room.id)} // Remover dispositivo do cômodo
          >
            {device.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Room;
