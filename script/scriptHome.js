console.log('yes');

// All section
const loadAll = ()=>{
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res) => res.json())
    .then(json => displayAll(json.data));
}

//  display all
const displayAll = (data) => {
    console.log(data);

    // get the container & empty it
    const allBtn = getElements('all-btn'); 
    console.log('allBtn',allBtn);
   
    allBtn.innerHTML = '';
    
    data.forEach(element => {
        const cardDiv = document.createElement('div');

        // "id": 1,
        // "title": "Fix navigation menu on mobile devices",
        // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        // "status": "open",
        // "labels": [
        // "bug",
        // "help wanted"
        // ],
        // "priority": "high",
        // "author": "john_doe",
        // "assignee": "jane_smith",
        // "createdAt": "2024-01-15T10:30:00Z",
        // "updatedAt": "2024-01-15T10:30:00Z"

        // status update
        let status = element.status;
        let open1='',close1='',open2='',close2='',border='';
        

        
        
        cardDiv.innerHTML = `
            <div class="card bg-base-100 shadow-md border-t-4 ${border} h-full">
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <div class="flex">
                            <img class="${open2} ${close2}" src="./assets/Open-Status.png">
                            <img class="${open1} ${close1}" src="./assets/Closed- Status .png">
                        </div>
                        <div class="px-7 py-2 bg-gray-200 rounded-full  gap-2 flex">${element.priority.toUpperCase()}</div>
                    </div>
                    <div class="border-b-2 border-gray-300 space-y-2 py-5">
                        <h2 class="card-title">${element.title}</h2>
                        <p>${element.description}</p>
                        <div id="tag-${element.id}" class="flex flex-wrap gap-4 mt-5">
                           
                        </div>
                    </div>
                    <div class="space-y-3 pt-4">
                        <p class="text-[#64748B]">#1 ${element.author}</p>
                        <p class="text-[#64748B]">${element.createdAt.slice(0,10)}</p>
                    </div>
                </div>
                
            </div>
        `;

        allBtn.append(cardDiv);
        
       
        

    });
}

loadAll();