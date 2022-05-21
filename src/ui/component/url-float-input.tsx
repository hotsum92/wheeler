import React, { useEffect, useRef } from 'react'
import { SxProps } from '@mui/system';
import { useTheme, Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

interface Props {
  urlInput: string
  onChangeUrlInput: (input: string) => void
  onSelectUrlInput: (selectStart: number, select: string) => void
  sx?: SxProps<Theme>
}

export default (props: Props) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(inputRef.current != null) {
      inputRef.current.addEventListener('select', () => {
        const select = window.getSelection()
        if(select == null
          || inputRef.current == null
          || inputRef.current.selectionStart == null
        ) return
        props.onSelectUrlInput(inputRef.current.selectionStart, select.toString())
      })
    }
  }, [])

  return (
    <Box sx={props.sx}>
      <Card sx={{ padding: 0.5 }}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              ...theme.typography.body1,
              visibility: 'hidden',
              boxSizing: 'border-box',
            }}
          >{ props.urlInput }
          </div>
          <input
            ref={inputRef}
            style={{
              ...theme.typography.body1,
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              padding: 0,
              outline: 'none',
              border: 'none',
              boxSizing: 'border-box',
            }}
            value={props.urlInput}
            onChange={e => props.onChangeUrlInput(e.target.value)}
          />
        </div>
      </Card>
    </Box>
  )
}
