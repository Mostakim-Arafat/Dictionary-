console.log('file connected')

const learnContainer = document.getElementById('learnContainer')


// API 1
fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(x => learn(x.data))


function learn(tab) {
    for (const i of tab) {
        //add button div
        const learnbutton = document.createElement('div')
        //add content
        learnbutton.innerHTML = `
          <button class='btn btn-outline btn-primary allNo' id='No-${i.level_no}' onclick='LoadData(${i.level_no})'><i class="fa-solid fa-book-open"></i> Lesson-${i.level_no}</button>
       `
        //append
        learnContainer.appendChild(learnbutton)

    }
}



//API-2

const learnContent = document.getElementById('content')

function LoadData(x) {
    learnContent.innerHTML = ''
    //color toggle
    const hello = document.querySelectorAll('.allNo')
    hello.forEach(x => {
        x.classList.remove('active')
    })
    document.getElementById(`No-${x}`).classList.add('active')


    spin(true)
    //custom url
    fetch(`https://openapi.programming-hero.com/api/level/${x}`)
        .then(res => res.json())
        .then(p => word(p.data))
    //show word
    function word(data) {
        if (data.length == 0) {
            learnContent.innerHTML = `
        <div class="text-center  col-span-full ">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="hind">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="hind text-2xl font-bold">নেক্সট Lesson এ যান</h1>
       
        </div>
            `
        spin(false)
            return
        }

        data.forEach(x => {
            //add button div
            const worddiv = document.createElement('div')

            //add content
            worddiv.innerHTML = `
           <div class="text-center px-4 py-10 bg-base-200 shadow rounded-xl max-w-80  space-y-2">
            <h1 class="font-bold text-2xl">${x.word ? x.word : "Not found"}</h1>
            <p>Meaning/Pronounciation</p>
            <h1 class="hind text-2xl ">${x.meaning ? x.meaning : "not found"}</h1>
            <div class="flex items-center justify-between mx-auto">
                <button onclick="detail(${x.id})"><i class="fa-solid fa-circle-info"></i></button>
                <button><i class="fa-solid fa-volume-low"></i></button>
            </div>
           </div>
          `

            //append
            learnContent.appendChild(worddiv)
            spin(false)
        }
        )
    }
}
//spinner function
const spinner = document.getElementById('spinner')
function spin(value) {
    if (value == true) {
        spinner.classList.remove('hidden')
        learnContent.classList.add('hidden')
    }
    else {
        spinner.classList.add('hidden')
        learnContent.classList.remove('hidden')
    }

}


//API 3

//synonyms word
function createBtn(arr) {
    console.log(arr)
    const pro = arr.map(i => `<span class= 'btn'> ${i}</span>`)
    return pro.join(" ")
}

const parentD = document.getElementById('parentD')

function detail(x) {//line 73
    my_modal_5.showModal()
    parentD.innerHTML = ''
    fetch(`https://openapi.programming-hero.com/api/word/${x}`)
        .then(res => res.json())
        .then(detail => puki(detail.data))
    function puki(x) {
        const childD = document.createElement('div')

        childD.innerHTML = `
    <h3 class="text-lg font-bold">${x.word} (<i class="fa-solid fa-bullhorn"></i> : ${x.pronunciation} )</h3>
               <p class="py-4">Meaning</p>
               <p>${x.meaning}</p>
               <p>Example</p>
               <p>${x.sentence}</p>
               <p class="hind">সমার্থক শব্দ গুলো</p>
               <div class="mr-2">
                  
                    ${createBtn(x.synonyms)}
                  
               </div>
    `
        parentD.prepend(childD)
    }
}