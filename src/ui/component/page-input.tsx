import React, { useRef, useEffect } from 'react'
import { SxProps } from '@mui/system';
import { useTheme, Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';

interface Props {
  pageInput: string
  onChangePageInput: (input: string) => void
  onClickBackwardButton: () => void
  onClickForwardButton: () => void
  onWheelUp: () => void
  onWheelDown: () => void
  sx?: SxProps<Theme>
}

export default (props: Props) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if(e.deltaY < 0) {
        props.onWheelUp()
      } else if(e.deltaY > 0) {
        props.onWheelDown()
      }
    }

    inputRef.current?.addEventListener('wheel', onWheel, { passive: false })

    return(() => {
      inputRef.current?.removeEventListener('wheel', onWheel)
    })
  }, [])

  return (
    <Box sx={props.sx}>
      <Card sx={{ padding: '2px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={props.onClickBackwardButton}
          ><ArrowBackIcon fontSize='inherit' /></IconButton>
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                ...theme.typography.body1,
                visibility: 'hidden',
                height: '28px',
                minWidth: '30px',
                boxSizing: 'border-box',
              }}
            >{ props.pageInput }
            </div>
            <input
              ref={inputRef}
              style={{
                ...theme.typography.body1,
                position: 'absolute',
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                height: '28px',
                width: '100%',
                top: 0,
                left: 0,
                padding: 0,
                outline: 'none',
                border: 'none',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
              value={props.pageInput}
              onChange={e => props.onChangePageInput(e.target.value)}
            />
          </div>
          <IconButton
            size='small'
            onClick={props.onClickForwardButton}
          ><ArrowForwardIcon fontSize='inherit' /></IconButton>
        </Box>
      </Card>
    </Box>
  )
}
