import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import './UpdatePokemon.css';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { updatePokemon } from '../../apiServices/pokemonDbApi';
import { UpdatePokemonProps } from '../../models/pokemons.Interface';

export default function UpdatePokemon({ onOpen, onClose, pokemonData, refreshPokemons }: UpdatePokemonProps) {
  const [formData, setFormData] = useState({
    name: '',
    number: 0,
    imageUrl: '',
    types: '',
  });

  useEffect(() => {
    if (pokemonData) {
      setFormData({
        name: pokemonData.name || '',
        number: pokemonData.number || 0,
        imageUrl: pokemonData.imageUrl || '',
        types: pokemonData.types.join(', ') || '',
      });
    }
  }, [pokemonData]);

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
      const update = await updatePokemon(pokemonData.number, {
        number: number,
        name,
        types: formattedTypes,
        imageUrl,
      });
      console.log(update);
      onClose();
      refreshPokemons();
    } catch (error) {
      console.error('업데이트에 실패했습니다.', error);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className="modal-overlay">
        <Box sx={style}>
          <Card>
            <div className="form--info__title">
              <h2>{formData.name} 의 정보를 수정하세요</h2>
            </div>
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
              <TextField fullWidth label="포켓몬 번호" name="number" value={formData.number} onChange={handleChange} />
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
            <div className="form--info__button">
              <Button onClick={onClose}>취소</Button>
              <Button onClick={handleSubmit} type="button">
                확인
              </Button>
            </div>
          </Card>
        </Box>
      </div>
    </Modal>
  );
}
