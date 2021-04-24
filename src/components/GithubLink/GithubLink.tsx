import React, {FC} from "react";
import s from './GithubLink.module.css'

export interface GithubLinkProps {
    username: string
    link?: string
}

const GithubLink: FC<GithubLinkProps> = ({username, link}) => {
    return <a className={s.title} href={link || `https://github.com/${username}`} target='_blank'>@{username}</a>
}

export default GithubLink