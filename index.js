

const loadData=async()=>{
  const url='https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data =await res.json();
  const tools = data.data.tools;
  displayTool(tools);
}
const displayTool=(tools)=>{
  const toolContainer = document.getElementById('tool-container');
  const featuresField = document.getElementById('features-field')
  const count = featuresField.childElementCount;
  tools.forEach((tool) => { 
    const toolDiv = document.createElement('div');
    toolDiv.classList=`card w-96 bg-base-100 shadow-xl`
  toolDiv.innerHTML=`
  <figure><img src="${tool.image}" alt="Shoes" /></figure>
  <div class="card-body">
  <h1 class="font-bold text-2xl">Features:  </h1>
  <p>${tool.features.map((feature,index)=> 
`<h3>${index+1}.${feature}</h3>`).join("") }</p>
  


  <hr>
    <div class="card-actions flex-col justify-left">
      <p class="text-2xl font-bold">${tool.name}  </p>
    
      <div class="flex justify-between gap-52">
    <div class="flex gap-3">
    <p><i class="fa-solid fa-calendar-days "></i></p>
    <p>${tool.published_in}</p>
    </div>
    <div class="">
    <i class="fa-solid fa-arrow-right text-pink-700 font-bold text-2xl"></i>
    </div>
    </div>
   
    </div>
    
  </div>
 
  `
  toolContainer.appendChild(toolDiv);
  }); 
}

const handleShowDetail=async(id)=>{

  //load single phone data
  const res = await fetch(` https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
   const details = data.data.tools;
  showPhoneDetails(details);

}
const showPhoneDetails = (details
  )=>{


    // show the modal
    show_details_modal.showModal();
}
loadData();
