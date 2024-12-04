import styled from "styled-components"
import {useState} from "react";

const SearchBox = () => {
    const [musicName, setMusicName] = useState('')

    return <SearchContainer placeholder={"노래제목 검색"} value={musicName} onChange={(e) => setMusicName(e.target.value)} />

};

const SearchContainer = styled.input`
    width: 200px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    @media (max-width: 450px) {
        width: 100%;
    }
`

export default SearchBox;
