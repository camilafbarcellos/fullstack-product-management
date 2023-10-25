import Menu from '../components/menu';
import ProductsTable from '../components/table';

export default function Home() {

    return (
        <div style={{ paddingTop: "80px" }}>
            <Menu />
            <ProductsTable />
        </div>
    );
}
