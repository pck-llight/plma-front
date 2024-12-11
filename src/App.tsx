import styled from "styled-components";
import {useEffect, useState} from "react";
import './assets/fonts/font.css'
import MusicUnit, {Music} from "./components/MusicUnit.tsx";
import axios from "axios";

const App = () => {
    const BASE_URL = "http://localhost:8000"
    const [musicList, setMusicList] = useState<Music[]>([])
    const [searchMusicList, setSearchMusicList] = useState<Music[]>([])
    const [musicName, setMusicName] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/db'); // 서버에서 데이터 가져오기
            setMusicList(response.data.musics); // 가져온 데이터로 상태 업데이트
        } catch (error) {
            console.error("API 요청 실패:", error);
        }
    };
    const deleteMusic = async (musicId: number) => {
        try {
            // 서버로 삭제 요청 보내기
            await axios.delete(`${BASE_URL}/db/${musicId}`);

            // 삭제된 음악을 목록에서 제거
            setMusicList((prevList) => prevList.filter((music) => music.number !== musicId));
        } catch (error) {
            console.error("삭제 요청 실패:", error);
            alert("머야 왜 안돼.");
        }
    };
    const searchMusic = async (musicTitle: string) => {
        try{
            return (await axios.get(`http://localhost:8000/db/search?a=${musicTitle}`)).data;
        }catch (error) {
            console.error("검색 요청 실패:", error);
            // alert("머야 왜 안돼.");
            return ;
        }
    }
    const addList = async (music: Music) => {
        try{
            const response = await axios.post(`${BASE_URL}/db`, {"number":music.number, "title":music.title, "singer":music.singer, "composer":music.composer});
            console.log(response)

        }catch (e) {
            console.error("실패", e);
        }
    }
    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, []);
    useEffect(() => {
        setSearchMusicList([])
    }, [isSearching]);

    return (
        <Screen>
            <NavBar>
                <Title onClick={()=>{
                    location.reload();
                }}>PLMA</Title>
                <Mukem>
                    <SearchContainer placeholder={"노래 제목 검색"}
                                     onChange={(e) => {
                                         setMusicName(e.target.value)
                                         // console.log(musicName)
                                     }}
                                     onKeyDown={(e) => {
                                         if (e.key === 'Enter') {
                                             if(musicName.length > 0){
                                                 console.log("검색된 제목:", musicName);
                                                 // 검색 로직 추가
                                                 searchMusic(musicName).then(value => {
                                                     console.log(value.searchRes)
                                                     if(value.searchRes[0] != "검색 결과를 찾을 수 없습니다."){
                                                         const res = value.searchRes.map((item: Music[]) => ({
                                                             number: item[0],
                                                             title: item[1],
                                                             singer: item[2],
                                                             composer: item[3],
                                                         }));
                                                         setSearchMusicList(res)
                                                     }else{
                                                         alert("결과가 엄서요")
                                                     }
                                                 });
                                                 setIsSearching(true)
                                             }
                                         }
                                     }}/>
                </Mukem>
            </NavBar>
            <Main>
                {searchMusicList.map((music:Music) => (
                    <MusicUnit number={music.number}
                               title={music.title}
                               singer={music.singer}
                               composer={music.composer}
                               func={()=>{
                                   addList(music)
                                   if(confirm(music.title+" 이거 추가할거임?")){
                                       setSearchMusicList([])
                                       setIsSearching(false)
                                       fetchData()
                                   }
                    }}
                               buttonText={"추가"}
                    />))}
                {musicList.map((music: Music) => (
                    <MusicUnit number={music.number}
                               title={music.title}
                               singer={music.singer}
                               composer={music.composer}
                               func={()=>{
                                   console.log(music.number);
                                   if(confirm(music.title+" 이걸 안불러?")) {
                                       deleteMusic(music.number)
                                   }}}
                               buttonText={"삭제"}
                    />))}
            </Main>

            {isSearching?<DiceContainer onClick={()=>{setIsSearching(false)}}>취소</DiceContainer>:
                <DiceContainer onClick={()=>{
                    console.log("될것같지 ㅋ")
                    alert("그냥 알아서 부르시고 ㅋ")
                }}>랜덤곡</DiceContainer>}
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
export const Mukem = styled.div`
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
