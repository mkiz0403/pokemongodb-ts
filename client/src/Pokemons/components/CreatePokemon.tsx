import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './CreatePokemon.css';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createPokemon } from '../../apiServices/pokemonDbApi';
import { CreateProps } from '../../models/pokemons.Interface';

export default function CreatePokemon({ onOpen, onClose }: CreateProps) {
  const [formData, setFormData] = useState({
    name: '',
    number: 0,
    imageUrl: '',
    types: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(): Promise<void> {
    const { number, name, imageUrl, types } = formData;
    const formattedTypes = types
      .split(',')
      .map(type => type.trim())
      .filter(type => type.length > 0);
    try {
      console.log(formData);
      await createPokemon({
        number: number,
        name,
        types: formattedTypes,
        imageUrl,
      });
      console.log('새로운 포켓몬 데이터:', formData);
      onClose();
      setFormData({ name: '', number: 0, imageUrl: '', types: '' });
    } catch (error) {
      console.error('Failed to create new pokemon', error);
    }
  }

  return (
    <Modal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className="modal-overlay">
        <Box className="modal-content">
          <Card>
            <div className="form--info__title">
              <h2>새로운 포켓몬 생성</h2>
            </div>
            <div className="form--info__input">
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginBottom: '1.5rem',
                }}>
                <TextField fullWidth label="포켓몬 이름" name="name" value={formData.name} onChange={handleChange} />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginBottom: '1.5rem',
                }}>
                <TextField
                  fullWidth
                  label="포켓몬 번호"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginBottom: '1.5rem',
                }}>
                <TextField
                  fullWidth
                  label="포켓몬 이미지 URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginBottom: '1.5rem',
                  gap: '1rem',
                  display: 'flex',
                }}>
                <TextField
                  fullWidth
                  label="포켓몬 타입 (ex. Fire, Water)"
                  name="types"
                  value={formData.types}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <div className="form--info__button">
              <Button onClick={onClose}>취소</Button>
              <Button onClick={handleSubmit}>확인</Button>
            </div>
          </Card>
        </Box>
      </div>
    </Modal>
  );
}
