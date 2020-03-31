import candidates from 'public/candidates.json'


export default q => {
    // TODO : ngram 인덱스를 하거나, 그대로 쓸거면 클라이언트로 보내거나
    return candidates.filter(candidate => candidate.name.includes(q))
}
