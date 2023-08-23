const ComapanyLogo = ()=>{
    return(
        <div
          id="carouselExampleControls"
          class="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="card-wrapper container-sm d-flex  justify-content-around">
                <div class="card  " style={{ width: "18rem",border:"none"}}>
                  <img
                    src="zoho.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />
                  
                </div>
                <div class="card" style={{ width: "18rem" ,border:"none" }}>
                  <img
                    src="cts.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />
                  
                </div>
                <div class="card" style={{ width: "18rem" ,border:"none" }}>
                  <img
                    src="virtuza.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />
                  
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card-wrapper container-sm d-flex   justify-content-around">
                <div class="card  " style={{ width: "18rem" ,border:"none" }}>
                  <img
                    src="dxc.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />
                  
                </div>
                <div class="card" style={{ width: "18rem" ,border:"none" }}>
                  <img
                    src="zoho.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />
                  
                </div>
                <div class="card" style={{ width: "18rem" ,border:"none"}}>
                  <img
                    src="cts.svg"
                    class="card-img-top"
                    alt="..."
                    style={{marginTop:"9%"}}
                  />      
                </div>
              </div>
            </div>
           
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
    );
}

export default ComapanyLogo;