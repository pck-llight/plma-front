import styled from "styled-components";
import {useState} from "react";
import './assets/fonts/font.css'
import MusicUnit, {Music} from "./components/MusicUnit.tsx";
import SearchBox from "./components/SearchBox.tsx";

const App = () => {
    const [musicList, setMusicList]: Music = useState([
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
        {number: 344332, title: "asdf", singer: "fff", composer: "d"},
    ])

    return (
        <Screen>
            <NavBar>
                <Title onClick={()=>{
                    location.reload();
                }}>PLMA</Title>
                <Mukem>
                    <SearchBox/>
                </Mukem>
            </NavBar>
            <Main>
                {musicList.map((music: Music) => (
                    <MusicUnit number={music.number} title={music.title} singer={music.singer} composer={music.composer} del={()=>{
                        console.log(music.number);
                        if(confirm("이걸 안불러?")) {
                            alert("노래알못 ㅋ")
                        }
                    }}/>
                ))}
            </Main>
            <DiceContainer onClick={()=>{
                alert("랜덤")
            }}>랜덤곡</DiceContainer>
        </Screen>
    );
};

export const Screen = styled.div`
    width: 100%;
    height: 100dvh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    padding: 80px 24px 120px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const NavBar = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    background: #ed7a1f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    gap: 16px;
`
const Title = styled.div`
    font-size: 36px;
    font-weight: 100;
    font-family: "logoFont";
`
const Mukem =styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    justify-content: end;
    @media (max-width: 450px) {
        width: 100%;
    }
`

const DiceContainer = styled.div`
    position: fixed;
    bottom: 48px;
    right: 24px;
    padding: 16px 8px;
    background-color: #fff;
    border: solid 2px #000;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: titleFont;
    @media (min-width: 450px) {
        //display: none;
    }
`

export default App;
