import { useState } from 'react'

// const fruits = ['apple', 'banana', 'orange']

// export default function ShowText() {
//     const [name, setName] = useState('')

//     const filteredFruits = fruits.filter((item) =>
//         item.toLowerCase().includes(name.toLowerCase()),
//     )

//     return (
//         <div>
//             <h1>Forms Part 2</h1>
//             <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
//             {name && filteredFruits.map((item) => <p key={item}>{item}</p>)}
//         </div>
//     )
// }

const ShowText = ({password}) => {
    let upper = false;
    let lower = false;
    let digit = false;

    for (let i of password){
        if(i<="Z" && i>="A"){
            upper = true;
        }else if(i <= "z" && i >= "a"){
            lower = true;
        }else if(i <= "9" && i >= "0"){
            digit = true
        }
    }

    return(
        <div>
            Hello
        </div>
    )
}

export default ShowText 