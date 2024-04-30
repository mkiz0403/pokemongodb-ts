import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '../FormElement/ShareModal';
import { MenubarProp } from '../../../models/pokemons.Interface';

export default function Menubar({ onAllPokemonDelete, onSearch, onOpenCreateModal }: MenubarProp) {
  const [searchNumber, setSearchNumber] = useState('');
  const [openShowModal, setopenShowModal] = useState(false);

  async function handleSearch() {
    const number = parseInt(searchNumber, 10);
    if (!isNaN(number)) {
      onSearch(number);
    } else {
      console.log('올바른 숫자를 입력하세요.');
    }
  }

  async function handleOpenModal() {
    setopenShowModal(true);
  }

  async function handleCloseModal() {
    setopenShowModal(false);
  }

  return (
    <>
      <Modal
        open={openShowModal}
        onClose={handleCloseModal}
        onConfirm={() => {
          onAllPokemonDelete();
          handleCloseModal();
        }}
        title="포켓몬 삭제"
        message={`전체 포켓몬을(를) 삭제 하시겠습니까?`}
        confirmButtonText={'삭제'}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          height: '60px',
          padding: '10px 20px',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 500,
          marginTop: '10.6rem',
        }}>
        <div>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <TextField
              fullWidth
              label="포켓몬 번호를 입력하세요."
              id="fullWidth"
              value={searchNumber}
              onChange={e => setSearchNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </Box>
        </div>
        <Button
          onClick={onOpenCreateModal}
          sx={{ width: 200, background: 'ligthgray', height: '50px', margin: '0 5px' }}>
          포켓몬 등록하기
        </Button>
        <Button onClick={handleOpenModal} sx={{ width: 200, background: 'ligthgray', height: '50px' }}>
          모든 포켓몬 삭제
        </Button>
      </div>
    </>
  );
}
