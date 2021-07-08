import React, { useState, useEffect } from 'react'
import GifSerch from './GifSerch'
import { GiphyFetch } from '@giphy/js-fetch-api'

interface Iprops {
    getUrl: (url: string) => void,
    colseModal: (url: boolean) => void,
}

function Gif({ getUrl, colseModal }: Iprops) {
    const gf = new GiphyFetch('KhZWcUbiOQ3YhTh1vFRWD1OTKHtzvNPW')

    const [initialGif, setInitialGif] = useState<object[]>([]);
    const [searchGif, setSearchGif] = useState<string>("");

    const loadInitialGif = async (search: string) => {
        let data: any = [];
        if (search.trim().length <= 0) {
            data = await gf.trending({ limit: 10 });
        } else {
            data = await gf.search(searchGif, { sort: 'relevant', lang: 'es', limit: 10 })
        }
        setInitialGif(data?.data)
    }
    useEffect(() => {
        loadInitialGif(searchGif);
    }, [searchGif])

    return (
        <div>
            <GifSerch onChange={setSearchGif} />
            {searchGif == "" ? (<p> Trending </p>) : (<p>{searchGif}</p>)}
            <div className="GifGrid">
                {
                    initialGif?.map((e: any, index: number) => (
                        <div key={index} style={{
                            width: "250px",
                        }} onClick={() => {
                            getUrl(e?.images.fixed_height.url);
                            colseModal(false)
                        }
                        } >
                            <img className="Gif" src={e?.images.fixed_height.url} height="200px" width="250px" alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Gif


