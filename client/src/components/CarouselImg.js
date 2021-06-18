import { Carousel } from 'react-materialize'
import './componentsStyle/CarouselStyleImg.css'

export const CarouselImg = ({ props }) => {
  if (props !== undefined) console.log(props)

  const onImgClickHandler = (view) => {
    console.log(`ibs: ${view}`) //
  }
  return (
    <div className='CaroselImgContainer'>
      <p>
        За период: {props !== undefined ? props.date.toLocaleDateString() : ''}
      </p>
      {(() => {
        if (props !== undefined)
          return (
            <div className='row'>
              <Carousel
                carouselId={`Carousel-${props.carouselId}`}
                options={props.options}
                className='white-text center'>
                {props.images.map((_img, index) => {
                  return (
                    <div key={_img}>
                      <img
                        key={`${_img}-${index}`}
                        src={_img}
                        onClick={() => {
                          onImgClickHandler(index)
                        }}
                      />
                    </div>
                  )
                })}
              </Carousel>
            </div>
          )
      })()}
    </div>
  )
}
