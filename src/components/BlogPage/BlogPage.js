import React from 'react';
class BlogPage extends React.Component{
    constructor(){
        super();
    }
    render=()=>{
        return(
            <div>
            <div class="container">
			    <div class="row">
				<div class="firstrow">
					<div class="col-md-1">
						<label >OnePage</label>
					</div>
					<div class="col-md-8">
					
					</div>
					 
					<a link="#">BLOG</a>
					<a link="#">FRONTPAGE</a>
					<a link="#">SAMPLEPAGE</a>
				</div>	 
				</div>
				<div class="text">
					<h1>CREATE ONE PAGE SITES IN MINUTES BY DRAG-AND-DROP</h1>
					<p>CREATE ONE PAGE SITES IN MINUTES BY DRAG-AND-DRO</p>
					 
					<button id="button1">button1</button>
					<button id="button2">button2</button>
				</div>
		 </div>
		 <div class="grid-container">
			<div class="grid-item">
				<img src=""  alt=""  class="img-rounded" height="40px" width="40px"></img>
				<h1>Heading1</h1>
				<p>paragraph</p>
				<button id="button3">button3</button>
			</div>
			<div class="grid-item">
				<img src=""  alt=""  class="img-rounded" height="40px" width="40px"></img>
				<h1>Heading2</h1>
				<p>paragraph</p>
				<button id="button4">button3</button>
			</div>
			<div class="grid-item">
				<img src=""  alt=""  class="img-rounded" height="40px" width="40px"></img>
				<h1>Heading3</h1>
				<p>paragraph</p>
				<button id="button5">button3</button>
			</div>
			<div class="grid-item">
				<img src=""  alt=""  class="img-rounded" height="40px" width="40px"></img>
				<h1>Heading4</h1>
				<p>paragraph</p>
				<button id="button6">button3</button>
			</div>
		</div>
        </div>
	
        )
    }
}
export default BlogPage;