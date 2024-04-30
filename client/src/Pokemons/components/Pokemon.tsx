import { PokemonsProps } from '../../models/pokemons.Interface';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShareModal from '../../shared/component/FormElement/ShareModal';
import { useState } from 'react';
import UpdatePokemon from './UpdatePokemon';

export default function Pokemon({ name, number, imageUrl, types, onOnePokemonDelete, refreshPokemons }: PokemonsProps) {
  const [openShowModal, setopenShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  async function handleOpenModal() {
    setopenShowModal(true);
  }

  async function handleCloseModal() {
    setopenShowModal(false);
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };

  return (
    <>
      {editMode && (
        <UpdatePokemon
          onOpen={editMode}
          onClose={handleCloseEdit}
          pokemonData={{ name, number, imageUrl, types }}
          refreshPokemons={refreshPokemons}
        />
      )}
      <ShareModal
        open={openShowModal}
        onClose={handleCloseModal}
        onConfirm={() => {
          onOnePokemonDelete(number);
          handleCloseModal();
        }}
        title="포켓몬 삭제"
        message={`${name} 포켓몬을(를) 삭제 하시겠습니까?`}
        confirmButtonText={'삭제'}
      />
      <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ height: 300, width: '80%', objectFit: 'contain' }}
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <div>No.{number}</div>
            <h4 style={{ margin: 0 }}>{name}</h4>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {types.join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" onClick={handleOpenModal}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
