function Getlinks(arrLinks) {
    return arrLinks.map(objectLink => Object.values(objectLink).join())
}

async function VerifyLink(ListURL) {
    const arrStatus = await Promise.all(
        ListURL.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (erro) {
               return ManageErro(erro)
            }

        })
    )
    return (arrStatus)
}

function ManageErro(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'Ocorreu um erro inesperado.';
    }

}

export default async function ValidationLinks(listOfLinks) {
    const links = Getlinks(listOfLinks)
    const status = await VerifyLink(links)

    return listOfLinks.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}