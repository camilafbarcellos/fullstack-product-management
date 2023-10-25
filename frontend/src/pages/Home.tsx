import Menu from '../components/menu';
import ProductsTable from '../components/table';

export default function Home() {

    return (
        <div style={{padding:"80px 10px 10px 10px"}}>
            <Menu />
            <ProductsTable />
        </div>
    );
}
