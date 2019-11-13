import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {backgroundColor, dark} from "../misc/Theme";
import {Button, ColorPicker, Input, InputGroup} from "../misc/Form";
import {randomColor, useOutsideAlerter} from "../helpers";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Container = styled.div`
    position: absolute;
    top: 32px;
    left: 50%;
    width: 240px;
    transform: translateX(-50%);
    z-index: 99999;
    padding: 8px;
    border-radius: 4px;
    background: ${backgroundColor};
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
`;

const Cloud = styled.div`
`;

const Box = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    
    svg{
        fill: rgba(${dark}, .3);
        display: block;
        margin: 24px auto;
        width: 50%;
        height: auto;
    }
    
    span{
        color: rgba(${dark}, .6);
        text-align: center;
    }
`;

const Tag = styled.div`
    font-size: .9rem;
    border-radius: 4px;
    padding: 6px 12px;
    color: ${backgroundColor};
    margin: 8px 0px 0px 0px;
`;

const Labeler = ({projects, toggle, open, add_tag, values, onSelect, match}) => {

    const project = projects.find(project => project.id === match.params.id);

    const element = useRef();
    const [filter, setFilter] = useState('');
    const [value, setValue] = useState('');
    const [color, setColor] = useState(randomColor());
    const [form, showForm] = useState(false);
    const [filteredTags, setFilteredTags] = useState(project.tags ? project.tags : []);

    useOutsideAlerter(element, open, () => toggle());

    const onSubmit = (e) => {
        e.preventDefault();

        let tag = null;
        if(value !== ''){
            tag = {
                color: color,
                name: value
            };
            add_tag({
                id: match.params.id,
                tag: tag
            });
        }

        setValue('');
        showForm(false);

        if(tag !== null){
            onSelect(tag)
        }
    };


    useEffect(() => {

        const array = [
            ...project.tags.filter(tag => tag.name.includes(filter))
        ];

        setFilteredTags(array)
    }, [filter, project.tags]);

    return(
        <Container ref={element}>
            <Cloud>
                <Input autoFocus value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={'filter Labels'}/>

                {filteredTags.length ? filteredTags.map(tag => (
                    <Tag key={tag.name} style={{backgroundColor: tag.color}} onClick={() => onSelect(tag)}>{tag.name}</Tag>
                )) : (
                    <Box justify={'center'}>
                        <svg viewBox="0 0 442 442"><path d="m442 268.474v-159.393c.004-.471-.036-.945-.1-1.419-.012-.091-.025-.182-.04-.272-.072-.435-.163-.868-.294-1.299-.003-.009-.007-.018-.01-.027-.096-.311-.206-.619-.334-.925-.037-.088-.083-.168-.122-.255-.049-.108-.101-.214-.154-.321-.17-.343-.355-.674-.559-.989-.028-.044-.052-.089-.081-.132-.247-.369-.518-.714-.806-1.041-.054-.061-.11-.118-.165-.178-.267-.289-.548-.561-.844-.813-.047-.041-.091-.083-.139-.123-.335-.275-.688-.524-1.053-.752-.085-.053-.172-.102-.259-.152-.339-.198-.688-.378-1.047-.535-.042-.018-.079-.044-.122-.062l-235.977-99.009c-.022-.009-.044-.015-.066-.024-.092-.038-.188-.067-.282-.102-1.447-.545-2.944-.74-4.396-.611-.028.002-.055.001-.083.004-.661.064-1.311.193-1.942.384-.038.012-.076.028-.114.041-.276.087-.55.184-.817.294-.012.005-.025.008-.038.014l-69.22 29.042c-3.714 1.559-6.131 5.193-6.131 9.222s2.417 7.663 6.131 9.222l63.089 26.471v88.156l-179.894 75.477c-.126.053-.242.118-.364.175-.119.056-.238.11-.355.171-.284.146-.557.305-.821.475-.042.027-.086.046-.128.074-.01.007-.018.015-.028.021-.332.222-.647.461-.945.717-.031.026-.058.055-.088.082-.255.225-.497.461-.726.708-.068.073-.132.148-.198.223-.187.214-.364.436-.531.664-.063.085-.126.169-.186.256-.18.263-.346.533-.5.81-.028.051-.061.099-.088.15-.174.327-.327.665-.464 1.008-.037.093-.066.188-.1.283-.094.26-.179.522-.252.789-.031.116-.06.231-.087.348-.064.274-.116.551-.157.831-.014.093-.031.186-.042.28-.046.393-.073.788-.072 1.187v85.372c0 4.028 2.417 7.663 6.131 9.222l235.916 98.984c.623.267 1.278.471 1.958.607.063.013.127.018.19.029.259.047.518.091.784.117.331.033.664.05.997.05s.665-.017.997-.05c.265-.026.525-.07.784-.117.063-.011.127-.016.19-.029.68-.136 1.336-.34 1.958-.607l185.965-78.025c3.714-1.559 6.131-5.193 6.131-9.222v-85.371c0-.035 0-.071 0-.105zm-111.772 31.929-63.151-26.496c-5.095-2.144-10.954.259-13.09 5.352s.259 10.953 5.352 13.091l45.043 18.898-58.405 24.505-108.357-45.463 58.404-24.505 35.524 14.905c5.094 2.137 10.954-.26 13.09-5.353 2.137-5.093-.259-10.953-5.352-13.091l-33.262-13.956v-63.71l200.128 83.968zm-144.204-52.112-74.252 31.154-75.924-31.856 150.176-63.009zm10-227.448 210.129 88.164-43.373 18.199-162.821-68.316c-.03-.013-.061-.025-.092-.038l-47.216-19.811zm162.814 126.398c1.256.539 2.598.81 3.942.81 1.314 0 2.629-.259 3.869-.778l55.351-23.225v129.458l-215.976-90.617v-79.764zm-338.838 115.388 215.976 90.618v63.711l-215.976-90.617zm402 84.671-166.024 69.658v-63.711l166.024-69.659z"/></svg>
                        <span>No tags or labels created, start creating some.</span>
                    </Box>
                )}

                <div style={{
                    marginTop: 24
                }}>
                    {form ? (
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <ColorPicker
                                    color={color}
                                    onChange={(color) => {setColor(color)}}
                                />
                                <Input
                                    value={value}
                                    placeholder={'Name your label or tag'}
                                    onChange={(e) => setValue(e.target.value)}
                                    onBlur={onSubmit}
                                />
                            </InputGroup>
                        </form>
                    ) : (
                        <Button fullWidth style={{margin: 0}} onClick={() => showForm(true)}>add label or tags</Button>
                    )}
                </div>
            </Cloud>
        </Container>
    );
};

const mapStateToProps = state => ({
    projects: state.projects
});

const mapDispatchToProps = dispatch => ({
    add_tag: tag => dispatch({
        type: 'ADD_TAG',
        payload: tag
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Labeler))