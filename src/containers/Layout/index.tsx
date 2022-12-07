import Footer from './containers/Footer';
import Header from './containers/Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
