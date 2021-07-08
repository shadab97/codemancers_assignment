import React from 'react';
interface Iprops {
    onChange: (val: string) => void
}
function GifSerch({ onChange }: Iprops) {
    return (

        <input type="text" placeholder="search gifs" className="GifSearchInput TextInput" onChange={(e) => {
            let val = e.target.value;
            onChange(val);
        }}
        />
    )
}

export default GifSerch
