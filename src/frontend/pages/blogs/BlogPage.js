import React, { useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import UnstyledButton from '../../components/Button';
import PreviewTable from '../../components/PreviewTable';
import TableCell from '@material-ui/core/TableCell';
import useBlogInfo from '../../hooks/blogs'
import { useHistory } from 'react-router-dom';
import closeIcon from './assets/closeIcon.svg';

const Button = styled(UnstyledButton)``;

const Container = styled.div`
  margin: ${(props) => props.theme.pageMargin};
`;

const CurrentGooseHeader = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
`;

const ButtonContainer = styled.div`
  ${Button} {
    margin-right: 28px;
    box-shadow: ${({ theme }) => theme.shadows.shadow1};
  }
`;

const TextBold = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const SummaryBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95px;
  height: 36px;
  border: 1px solid ${(props) => props.theme.colours.yellows.yellow2};
  font: ${(props) => props.theme.fonts.bold18};
  line-height: 23px;
  background-color: ${(props) => props.theme.colours.yellows.yellow2};
  color: ${(props) => props.theme.colours.blacks.black3};
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colours.greys.grey2};
    border: 1px solid ${(props) => props.theme.colours.greys.grey2};
  }
`;

const TableLabelHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 0;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const LinkButton = styled.button`
  color: black;
  text-decoration: none;
`;

const TableHeader = styled.p`
  font: ${({ theme }) => theme.fonts.bold36};
  margin: 10px;
`;

const PopUpOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color:rgb(64,64,64);
  opacity:0.6;
`;

const PopUp = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  border: 5px solid #FFFFFF;
  padding: 10px;
  width: 60vw;
  height: 35vh;
  background-color: white;
  opacity: 1 !important;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 2px 10px 13px #888888;
`;

const CancelButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: black;
  background-color: white;
  border: none;
  text-decoration: none;
`;

const Close = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const SummaryTitle = styled.h5`
  font: ${({ theme }) => theme.fonts.bold36};
  margin: 10px;
`;

const SummaryDesc = styled.p`
  padding: 0 40px 20px 40px;
  font: ${({ theme }) => theme.fonts.light18};
`;

const headers = [
  {id: 'title', value: 'Blog'},
  {id: 'author', value: 'Author'},
  {id: 'updatedAt', value: 'Last Updated'},
  {id: 'link', value: 'Medium Link'}
];

const RowComponent = ({ title, author, updatedAt, link }) => (
  <>
    <TableCell>
      <TextBold>{title}</TextBold>
    </TableCell>
    <TableCell>{updatedAt}</TableCell>
    <TableCell>{author}</TableCell>
    <TableCell>
      <LinkButton as="a" href={link}>Link</LinkButton>
    </TableCell>
  </>
);

const BlogPage = () => {
  const { blogInfo } = useBlogInfo();
  const history = useHistory();
  const [popup, setPopup] = useState(<></>);

  const blogs = blogInfo?.posts?.map((blog) => ({
    id: blog.id,
    title: blog.title,
    author: blog.author,
    updatedAt: blog.date,
    link: blog.link,
    summary: blog.summary
  }));

  console.log(blogs)

  const addBlog = useCallback(() => {
    history.push('/blog/add');
  }, [history]);

  const onViewSummary = useCallback(
    (summary) => {
      setPopup(
        <div>
          <PopUp>
            <CancelButton>
              <Close onClick={() => setPopup(<></>)} alt="Close Summary" src={closeIcon} />
            </CancelButton>
            <SummaryTitle>Summary</SummaryTitle>
            <SummaryDesc>{summary}</SummaryDesc>
          </PopUp>
          <PopUpOverlay></PopUpOverlay>
        </div>);
    }, 
    [],
  );

  return (
    <Container>
      {popup}
      <TableLabelHeader>
        <TableHeader>Blogs</TableHeader>
        <Button label="New Blog +" onClick={addBlog} />
      </TableLabelHeader>
      <PreviewTable
        headers={headers}
        RowComponent={RowComponent}
        rows={blogs}
        onSummary={onViewSummary}
      />
    </Container>
  );
};

export default BlogPage;
