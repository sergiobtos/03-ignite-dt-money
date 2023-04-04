import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from "phosphor-react";

export function SearchForm() {
    return(
        <SearchFormContainer>
            <input type="text" placeholder="Search by transactions"/>

            <button type="submit">
               <MagnifyingGlass size={20}/>
               Search
            </button>
        </SearchFormContainer>
    )
}