import styled from "styled-components";
import {useEffect, useState} from "react";
import './assets/fonts/font.css'
import MusicUnit, {Music} from "./components/MusicUnit.tsx";
import axios from "axios";

const App = () => {
    const [musicList, setMusicList] = useState<Music[]>([])
    const [musicName, setMusicName] = useState('')
    const deleteMusic = async (musicId: number) => {
        try {
            // 서버로 삭제 요청 보내기
            await axios.delete(`http://localhost:8000/db/${musicId}`);

            // 삭제된 음악을 목록에서 제거
            setMusicList((prevList) => prevList.filter((music) => music.number !== musicId));
        } catch (error) {
            console.error("삭제 요청 실패:", error);
            alert("머야 왜 안돼.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/db'); // 서버에서 데이터 가져오기
                setMusicList(response.data.musics); // 가져온 데이터로 상태 업데이트
            } catch (error) {
                console.error("API 요청 실패:", error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, []);

    return (
        <Screen>
            <NavBar>
                <Title onClick={()=>{
                    location.reload();
                }}>PLMA</Title>
                <Mukem>
                    <SearchContainer placeholder={"노래제목 검색"}
                                     onChange={(e) => {
                                         setMusicName(e.target.value)
                                         // console.log(musicName)
                                     }}
                                     onKeyDown={(e) => {
                                         if (e.key === 'Enter') {
                                             console.log("검색된 제목:", musicName);
                                             // 검색 로직 추가
                                             alert(`"${musicName}"로 검색합니다.`);
                                         }
                                     }}/>
                </Mukem>
            </NavBar>
            <Main>
                {musicList.map((music: Music) => (
                    <MusicUnit number={music.number} title={music.title} singer={music.singer} composer={music.composer} del={()=>{
                        console.log(music.number);
                        if(confirm(music.title+" 이걸 안불러?")) {
                            alert("지울게 ㅋㅋ")
                            deleteMusic(music.number)
                        }
                    }}/>
                ))}
            </Main>
            <DiceContainer onClick={()=>{
                // serverGet(1,3)
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
export const Mukem =styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    justify-content: end;
    @media (max-width: 450px) {
        width: 100%;
    }
`

export const DiceContainer = styled.div`
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
const SearchContainer = styled.input`
    width: 200px;
    padding: 12px;
    border: none;
    border-radius: 4px;
    @media (max-width: 450px) {
        width: 100%;
    }
`

export default App;
