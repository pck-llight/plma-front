import {DiceContainer, Screen} from "../App.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const musicName = location.state.musicName;
    //뮤직 리스트 검색 요청

    return (
        <Screen>
            <DiceContainer onClick={()=>{
                navigate('/')
            }}>뒤로가기</DiceContainer>
            {musicName}
        </Screen>
    );
};


export default SearchResult;
