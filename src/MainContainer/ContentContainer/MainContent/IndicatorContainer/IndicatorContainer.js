import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Context from '../../../../Context/Context'
import { Container, LeftMenuItem } from './IndicatorContainer.style'

export const IndicatorContainer = () => {
  const [state, dispatch] = useContext(Context)
  const availableIndicators = ['Electricity demands', 'Emission Limit']
  return (
    <Container>
      <Col>
        {availableIndicators.map((indicator, i) => (
          <Row key={i}>
            <LeftMenuItem
              onClick={() => {
                let newIndicator = indicator
                if (indicator === state.selectedIndicator) {
                  newIndicator = null
                }
                dispatch({
                  type: 'setSelectedIndicator',
                  name: newIndicator,
                })
              }}
              selected={indicator === state.selectedIndicator}
            >
              {indicator}
            </LeftMenuItem>
          </Row>
        ))}
      </Col>
    </Container>
  )
}
