import React from 'react'

function AllproductsFilter() {
  return (
    <>
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Brands
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <form>
				<label class="form-check">
				  <input class="form-check-input" type="checkbox" value="" />
				  <span class="form-check-label">
				    Mersedes Benz
				  </span>
				</label>
				<label class="form-check">
				  <input class="form-check-input" type="checkbox" value="" />
				  <span class="form-check-label">
				    Nissan Altima
				  </span>
				</label>
				<label class="form-check">
				  <input class="form-check-input" type="checkbox" value="" />
				  <span class="form-check-label">
				    Another Brand
				  </span>
				</label>
			</form>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Choose Category
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    First hand items
			  </span>
			</label>
			<label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    Brand new items
			  </span>
			</label>
			<label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    Some other option
			  </span>
			</label>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Choose Price
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    Under-Rs500
			  </span>
			</label>
			<label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    Rs500-1000
			  </span>
			</label>
			<label class="form-check">
			  <input class="form-check-input" type="radio" name="exampleRadio" value="" />
			  <span class="form-check-label">
			    Rs1000-2000
			  </span>
			</label>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default AllproductsFilter