import styled from "styled-components";

export interface Music {
    number: number;
    title: string;
    singer: string;
    composer: string;
    star?: boolean;
    func?: ()=>void;
    buttonText?: string;
}

const MusicUnit = (music: Music) => {
    return (
        <MusicContainer>
            <TitleContainer>
                <MusicNum>[ {music.number} ]</MusicNum>
                <MusicName>{music.title}</MusicName>
            </TitleContainer>
            <CaptionContainer>
                <Caption>가수: {music.singer}</Caption>
                <Caption>작곡가: {music.composer}</Caption>
            </CaptionContainer>
            {music.buttonText=="추가"?
                <AddButton onClick={music.func}>추가</AddButton>:
                <DelateButton onClick={music.func}>삭제</DelateButton>
            }

        </MusicContainer>
    );
};

const MusicContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    border: solid 1px gray;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
`

const MusicNum = styled.div`
    font-size: 20px;
    font-family: titleFont;
`

const MusicName = styled.div`
    font-size: 18px;
    font-family: titleFont;
`

const Caption = styled.div`
    font-size: 16px;
    font-family: captionFont;
`

const CaptionContainer =styled.div`
    display: flex;
    flex-direction: column;
`

const TitleContainer =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 24px;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const DelateButton = styled.div`
    padding: 8px;
    font-size: 16px;
    color: red;
    font-style: initial;
    border: red solid 1px;
    border-radius: 4px;
    
`
const AddButton = styled.div`
    padding: 8px;
    font-size: 16px;
    color: blue;
    font-style: initial;
    border: blue solid 1px;
    border-radius: 4px;
`

export default MusicUnit;
