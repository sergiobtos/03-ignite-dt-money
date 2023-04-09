import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";


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
                            <td>
                                <PriceHighlight variant={el.type}>
                                    {el.type === 'outcome' && '- '}
                                    {priceFormatter.format(el.price)}
                                </PriceHighlight>
                            </td>
                            <td>{el.category}</td>
                            <td>{dateFormatter.format(new Date(el.createdAt))}</td>
                        </tr>
                        )})}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}