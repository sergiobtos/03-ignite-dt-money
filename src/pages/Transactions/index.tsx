import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";


export function Transactions() { 
    const {transactions} = useContext(TransactionsContext)

    return (
        <div>
            <Header />
            <Summary />
            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(el => {return(
                            <tr key={el.id}>
                            <td width="50%">{el.description}</td>
                            <td><PriceHighlight variant={el.type}>$ {el.price}</PriceHighlight></td>
                            <td>{el.category}</td>
                            <td>{el.createdAt}</td>
                        </tr>
                        )})}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}