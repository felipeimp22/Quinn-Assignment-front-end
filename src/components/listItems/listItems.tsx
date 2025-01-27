import React, { useCallback, useEffect, useRef } from "react";
import {
  ListContainer,
  ListTitle,
  ListItemContainer,
  ItemDetails,
  PlayButton,
  BorderStyled,
} from "./styles";

interface ListItem {
  id: string;
  title: string;
  subTitle?: string;
  author?: string;
}

interface ListProps {
  title: string;
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
  loadMoreItems?: () => void;
  backgroundTransparent?: boolean;
  disablePlay?: boolean;
  whiteText?:boolean;
}

const ListItems: React.FC<ListProps> = ({
  title,
  items,
  onItemClick,
  loadMoreItems,
  backgroundTransparent = false,
  disablePlay = false,
  whiteText = false
}) => {
  const listEndRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMoreItems = useCallback(() => {
    if (loadMoreItems) {
      loadMoreItems();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (listEndRef.current) {
      observer.observe(listEndRef.current);
    }

    return () => {
      if (listEndRef.current) {
        observer.unobserve(listEndRef.current);
      }
    };
  }, [handleLoadMoreItems]);

  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      {items.map((item) => (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <ListItemContainer
          style={
            backgroundTransparent ? { backgroundColor: "transparent" } : {}
          }
          key={item.id}
        >
          <ItemDetails>
            <span style={whiteText ? {color:"white"}:{}}>{item.title}</span>
            {item.subTitle && <span style={{color:"#FF275B"}}>{item.subTitle}</span>}
            
            {item.author && <span style={whiteText ? {color:"white"}:{}}>by {item.author}</span>}
          </ItemDetails>
          {!disablePlay && onItemClick ? (
            <PlayButton onClick={() => onItemClick(item)}>Play</PlayButton>
          ) : null}
        </ListItemContainer>
          <BorderStyled />
          </ div>
      ))}

      <div ref={listEndRef} style={{ height: "1px" }} />
    </ListContainer>
  );
};

export default ListItems;
