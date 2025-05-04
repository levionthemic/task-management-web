import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { cloneDeep } from 'lodash'

import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import bgImg from '~/assets/bg-board-detail.jpg'

function BoardDetailPage() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderdedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderdedColumnsIds
    dispatch(updateCurrentActiveBoard((newBoard)))

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    updateColumnDetailsAPI(columnId, { cardOrderIds: columnToUpdate.cardOrderIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderdedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderdedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return <PageLoadingSpinner caption='Loading Board...' />
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <ActiveCard />

      <AppBar />

      <Grid container>
        <Grid item lg={2} md={2} sm={2}>
          <Box sx={{
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            height: '100%'
          }}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography sx={{ fontWeight: '500' }}>Levi Workspace</Typography>
              <Typography>Free</Typography>
            </Box>

            <Divider />

            <Box sx={{ py: 1 }}>
              <Box sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: (theme) => theme.palette.grey[300] }, py: 1/2 }}>
                <MdSpaceDashboard />
                <Typography>Boards</Typography>
              </Box>
              <Box sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', '&:hover': { bgcolor: (theme) => theme.palette.grey[300] }, py: 1/2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaUserFriends />
                  <Typography>Members</Typography>
                </Box>
                <IconButton sx={{ p: 0 }}>
                  <IoMdAdd/>
                </IconButton>
              </Box>

              <Typography sx={{ fontWeight: '500', color: (theme) => theme.palette.text.main, pl: 2, pt: 1 }}>Your boards</Typography>

            </Box>
          </Box>
        </Grid>
        <Grid item lg={10} md={10} sm={10}>
          <BoardBar board={board} />
          <BoardContent
            board={board}

            moveColumns={moveColumns}
            moveCardInTheSameColumn={moveCardInTheSameColumn}
            moveCardToDifferentColumn={moveCardToDifferentColumn}
          />
        </Grid>
      </Grid>

    </Container>
  )
}

export default BoardDetailPage
