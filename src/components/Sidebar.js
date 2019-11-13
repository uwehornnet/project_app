import React, {useState} from 'react';
import styled from "styled-components";
import {
    dark,
    primary,
    color,
    sidebarBackgroundColor,
    modalBackgroundColor
} from "../misc/Theme";
import {Add, Layers} from "../misc/Icons";
import Menu from "./Menu";
import CreateProjectModal from "./CreateProjectModal";
import CreateTaskModal from "./CreateTaskModal";
import {Link} from "react-router-dom";
import SettingsModal from "./settingsmodal";
import {MegaMenu} from "./MegaMenu";
import {Switch} from "./Switch";
import {connect} from "react-redux";

const Container = styled.div`
    background: rgba(${sidebarBackgroundColor}, .2);
    width: 70px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 16px 0px 0px 0px;
    z-index: 9999;
`;


const Controls = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flex ? 1 : 0};
    justify-content: ${props => props.justify ? props.justify : 'space-between'};
    padding: 4px;
    
    .label{
        height: 48px;
        
        svg{
            margin: 0px;
        }
    }
    
    a{
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        width: 100%;
        background: rgba(${primary}, 0);
        border-radius: 4px;
    
        svg{
            height: 16px;
            width: auto;
            display: block;
            fill: rgba(${color}, .7);
        }
        
        &:hover,
        &.current{
            background: rgba(${primary}, .1);
            svg{
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const Inner = styled.div`
    color: rgba(${color}, .7);
    position: absolute;
    z-index: 999;
    background: ${modalBackgroundColor};
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
    padding: 4px;
    border-radius: 4px;
    min-width: 200px;
    ${props => {
        if(props.position && props.position === 'bottom'){
            return(`top: 100%;`);
        }else if(props.position && props.position === 'bottom-left'){
            return(`top: 100%; right: 0%;`)
        }else if(props.position && props.position === 'right'){
            return(`top: 20%; left: 80%;`)
        }else if(props.position && props.position === 'bottom-right'){
            return(`top: 100%; left: 0%;`)
        }else if(props.position && props.position === 'left'){
            return(`top: 20%; right: 80%;`)
        }else if(props.position && props.position === 'top'){
            return(`bottom: 20%; left: 80%;`)
        }else{
            return(`left: 40px; top: 20px;`);
        }
    }}

    label{
        display: block;
        font-size: .9rem;
        color: rgba(${color}, .2);
        margin-bottom: 4px;
    }
    
    svg{
        height: 14px;
        width: auto;
        display: block;
    }
    
    .item{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-radius: 4px;
        color: rgba(${color}, .7);
        
        svg{
            height: 14px;
            width: auto;
            display: block;
            fill: rgba(${color}, .4);
            margin-right: 8px;
        }
        
        &:hover{
            color: rgba(${primary}, 1);
            background: rgba(${primary}, .1);
            svg{
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const Sidebar = ({settings, toggle_darkmode}) => {
    const [projectModal, showProjectModal] = useState(false);
    const [taskModal, showTaskModal] = useState(false);
    const [settingsModal, showSettingsModal] = useState(false);
    const [menu, showMenu] = useState(false);

    return (
        <>
            <Container>
                <Controls>
                    <Menu
                        position={'right'}
                        label={Add}
                        items={[
                            {
                                label: (
                                    <>
                                        <svg viewBox="0 0 512.00034 512"><path d="m74.742188 328.078125c-2.898438 5.78125-1.769532 12.769531 2.796874 17.339844l3.667969 3.667969c10.597657-12.558594 22.949219-26.1875 37.929688-41.164063 1.058593-1.058594 2.148437-1.570313 3.210937-2.546875l-23.597656-23.601562c-13.71875 24.8125-21.71875 41.765624-24.007812 46.304687zm0 0"/><path d="m203.988281 392.773438c-15.015625 15.015624-28.609375 27.390624-41.097656 37.996093l4.96875 4.96875c4.609375 4.609375 11.664063 5.71875 17.464844 2.734375 7.769531-4.003906 19.988281-9.753906 45.925781-24.199218l-24.710938-24.710938c-.976562 1.066406-1.488281 2.152344-2.550781 3.210938zm0 0"/><path d="m195.992188 315.9375c-10.839844-10.839844-41.324219-1.121094-55.644532 13.195312-47.90625 47.90625-69.542968 81.871094-79.257812 101.925782-2.785156 5.746094-1.625 12.625 2.890625 17.140625 4.523437 4.527343 11.414062 5.675781 17.164062 2.890625 19.605469-9.519532 53.15625-31.054688 101.632813-79.527344 15.746094-15.753906 23.515625-45.320312 13.226562-55.613281zm0 0"/><path d="m46.820312 199.710938-42.425781 42.425781c-4.796875 4.796875-5.78125 12.222656-2.382812 18.105469 3.316406 5.804687 10.261719 8.761718 16.871093 6.992187 22.929688-6.148437 43.105469-8.746094 56.691407-5.261719 19.328125-34.363281 40.097656-65.996094 62.09375-94.730468-12.722657-8.15625-54.765625-3.613282-90.847657 32.46875zm0 0"/><path d="m253.894531 510.390625c5.777344 2.921875 12.773438 1.792969 17.347657-2.785156l42.429687-42.425781c32.847656-32.855469 38.628906-75.246094 31.175781-88.6875-32.046875 24.152343-64.511718 44.546874-94.800781 61.621093 2.089844 11.800781.699219 23.25-4.242187 56.6875-.964844 6.472657 2.378906 12.734375 8.089843 15.589844zm0 0"/><path d="m297.800781 150.46875c-17.542969 17.546875-17.542969 46.089844 0 63.636719 17.546875 17.546875 46.09375 17.546875 63.640625 0s17.546875-46.089844 0-63.636719-46.09375-17.546875-63.640625 0zm0 0"/><path d="m511.117188 14.632812c-.539063-7.417968-6.445313-13.28125-13.839844-13.835937-36.839844-2.773437-73.535156 1.757813-109.503906 12.757813 2.707031 24.710937 15.488281 51.453124 37.308593 73.273437 22.082031 22.078125 49.550781 34.855469 74.703125 37.246094 9.6875-33.949219 14.28125-70.308594 11.332032-109.441407zm0 0"/><path d="m403.871094 108.042969c-24.960938-24.960938-40.203125-54.898438-45.09375-84.046875-90.074219 36.941406-176.300782 117.613281-244.4375 230.941406l33.851562 33.851562c23.128906-9.390624 51.207032-11.871093 69.015625 5.933594 17.832031 17.835938 15.304688 45.902344 5.917969 69l34.964844 34.964844c87.195312-52.550781 188.710937-135.34375 231.878906-245.496094-29.859375-4.511718-60.730469-19.78125-86.097656-45.148437zm-21.21875 127.277343c-29.238282 29.238282-76.820313 29.238282-106.0625 0-29.242188-29.242187-29.242188-76.828124 0-106.066406 29.242187-29.238281 76.824218-29.238281 106.0625 0 29.242187 29.242188 29.242187 76.824219 0 106.066406zm0 0"/></svg>
                                        add Project
                                    </>
                                ),
                                onClick: () => showProjectModal(!projectModal)
                            },
                            {
                                label: (
                                    <>
                                        <svg viewBox="0 0 489.6 489.6"><path d="m434.65 52.2h-96.6v-34.2c0-9.9-8.1-18-18-18h-150.4c-9.9 0-18 8.1-18 18v94.7c0 9.9 8.1 18 18 18h111.2c9.9 0 18-8.1 18-18s-8.1-18-18-18h-93.2v-58.7h114.5v34.2c0 9.9 8.1 18 18 18h96.6v365.4h-343.8v-365.4h27.5c9.9 0 18-8.1 18-18s-8.1-18-18-18h-45.5c-9.9 0-18 8.1-18 18v401.4c0 9.9 8.1 18 18 18h379.7c9.9 0 18-8.1 18-18v-401.4c0-9.9-8.1-18-18-18z"/><path d="m327.75 217c-7-7.1-18.4-7.1-25.5-.1l-83.9 83.2-30.7-30.9c-7-7.1-18.4-7.1-25.5-.1s-7.1 18.4-.1 25.5l43.4 43.7c3.5 3.5 8.1 5.3 12.8 5.3 4.6 0 9.2-1.7 12.7-5.2l96.7-95.9c7.1-7 7.1-18.4.1-25.5z"/></svg>
                                        add Task
                                    </>
                                ),
                                onClick: () => showTaskModal(!taskModal)
                            }
                        ]}
                    />
                </Controls>

                <Controls justify={'center'} flex>
                    <Link to={'/'}>{Layers}</Link>
                    <Link to={'/schedule'}>
                        <svg viewBox="0 0 512 512"><path d="m304.188 84.329v-84.329h-96.376v84.329l30.118 30.118v357.575c-3.737 4.245-6.024 9.797-6.024 15.884 0 13.285 10.809 24.094 24.094 24.094 13.286 0 24.094-10.809 24.094-24.094 0-6.087-2.286-11.637-6.023-15.884v-357.575z"/><path d="m310.212 192.753h114.447v72.282h-114.447z"/><path d="m15.059 192.753h186.729v72.282h-186.729z"/><path d="m310.212 337.318h186.729v72.282h-186.729z"/><path d="m15.059 337.318h186.729v72.282h-186.729z"/></svg>
                    </Link>
                    <Link to={'/analytics'}>
                        <svg viewBox="0 0 490.4 490.4"><path d="m221.75 490.4v-221.7h-221.7c0 122.4 99.3 221.7 221.7 221.7zm-42.2-47.3c-65.1-15.8-116.5-67.1-132.2-132.2h132.2z"/><path d="m268.75 0c-122.5 0-221.8 99.3-221.8 221.7h221.7v221.7c122.5 0 221.7-99.3 221.7-221.7s-99.2-221.7-221.6-221.7z"/></svg>
                    </Link>
                </Controls>
                <Controls>
                    <MegaMenu
                        open={menu}
                        onClick={() => showMenu(!menu)}
                        label={
                            <svg viewBox="0 0 369.793 369.792"><path d="m320.83 140.434-1.759-.627-6.87-16.399.745-1.685c20.812-47.201 19.377-48.609 15.925-52.031l-27.761-27.082c-1.135-1.126-3.128-1.918-4.846-1.918-1.562 0-6.293 0-47.294 18.57l-1.644.738-16.916-6.812-.679-1.684c-19.281-47.742-21.256-47.742-26.054-47.742h-39.205c-4.78 0-6.957 0-24.836 47.825l-.673 1.741-16.828 6.86-1.609-.669c-27.752-11.7-43.956-17.633-48.18-17.633-1.714 0-3.714.769-4.854 1.892l-27.787 27.16c-3.525 3.477-4.987 4.933 16.915 51.149l.805 1.714-6.881 16.381-1.684.651c-48.86 18.882-48.86 20.723-48.86 25.641v38.418c0 4.931 0 6.979 48.957 24.524l1.75.618 6.882 16.333-.739 1.669c-20.812 47.223-19.492 48.501-15.949 52.025l27.719 27.119c1.162 1.117 3.173 1.915 4.888 1.915 1.552 0 6.272 0 47.3-18.561l1.643-.769 16.927 6.846.658 1.693c19.293 47.726 21.275 47.726 26.076 47.726h39.217c4.924 0 6.966 0 24.859-47.857l.667-1.742 16.855-6.814 1.604.654c27.729 11.733 43.925 17.654 48.122 17.654 1.699 0 3.717-.745 4.876-1.893l27.832-27.219c3.501-3.495 4.96-4.924-16.981-51.096l-.816-1.734 6.869-16.31 1.64-.643c48.938-18.981 48.938-20.831 48.938-25.755v-38.395c-.001-4.93-.001-6.966-48.964-24.446zm-135.934 106.769c-35.038 0-63.542-27.959-63.542-62.3 0-34.342 28.505-62.264 63.542-62.264 35.023 0 63.522 27.928 63.522 62.264.001 34.335-28.498 62.3-63.522 62.3z"/></svg>
                        }
                        style={{
                            height: '50px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {menu ? (
                            <Inner position={'top'}>
                                <span className="item" onClick={() => showSettingsModal(!settingsModal)}>
                                    <svg viewBox="0 0 45.532 45.532"><path d="m22.766.001c-12.572 0-22.766 10.192-22.766 22.765s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765s-10.192-22.765-22.766-22.765zm0 6.807c4.16 0 7.531 3.372 7.531 7.53 0 4.159-3.371 7.53-7.531 7.53-4.158 0-7.529-3.371-7.529-7.53 0-4.158 3.371-7.53 7.529-7.53zm-.005 32.771c-4.149 0-7.949-1.511-10.88-4.012-.714-.609-1.126-1.502-1.126-2.439 0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592 0 .938-.41 1.829-1.125 2.438-2.93 2.502-6.731 4.013-10.881 4.013z"/></svg>
                                    Profile & Settings
                                </span>

                                <span className="item" onClick={() => {
                                    toggle_darkmode(!settings.darkMode);
                                    showMenu(!menu)
                                }}>
                                    Nightshift <Switch checked={settings.darkMode}/>
                                </span>
                            </Inner>

                        ) : null}
                    </MegaMenu>
                </Controls>
            </Container>
            <CreateProjectModal
                open={projectModal}
                toggle={() => showProjectModal(!projectModal)}
            />
            <CreateTaskModal open={taskModal} toggle={() => showTaskModal(!taskModal)}/>
            <SettingsModal open={settingsModal} toggle={() => showSettingsModal(!settingsModal)}/>
        </>
    );
};

const mapStateToProps = state => ({
    settings: state.settings
});

const mapDispatchToProps = dispatch => ({
    toggle_darkmode: settings => dispatch({
        type: 'TOGGLE_MODE',
        payload: settings
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);