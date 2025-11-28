import { createContext, useState, useContext, useMemo, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Inicializa lendo do LocalStorage (se existir)
    const [itens, setItens] = useState(() => {
        const salvo = localStorage.getItem("marmitapp_carrinho");
        return salvo ? JSON.parse(salvo) : [];
    });

    // 2. Sempre que "itens" mudar, salva no LocalStorage automaticamente
    useEffect(() => {
        localStorage.setItem("marmitapp_carrinho", JSON.stringify(itens));
    }, [itens]);

    const adicionarAoCarrinho = (produto) => {
        setItens((atual) => {
        const itemExistente = atual.find((i) => i.id === produto.id);
        if (itemExistente) {
            return atual.map((i) =>
            i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
            );
        }
        return [...atual, { ...produto, quantidade: 1 }];
        });
    };

    const removerDoCarrinho = (id) => {
        setItens((atual) =>
        atual
            .map((i) => (i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i))
            .filter((i) => i.quantidade > 0)
        );
    };

    const limparCarrinho = () => setItens([]);

    const total = useMemo(() => {
        return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    }, [itens]);

    return (
        <CartContext.Provider value={{ itens, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, total }}>
        {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);