import Carousel from './Carousel.js';
import { CarouselItem } from './Carousel.js';

const App = ( ) => (

<Carousel>
            {[1, 2, 3, 4].map((i) => (
              <CarouselItem key={i}>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    backgroundImage:
                      "url('https://www.akamai.com/content/dam/site/im-demo/perceptual-standard.jpg?imbypass=true')",
                    width: "1300px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    justifyContent: "space-around",
                    alignItems: "center",
                    color: "black",
                    zIndex: "1!important",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Button style={{ margin: "15px" }}>Voir le produit</Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
)
export default App;
