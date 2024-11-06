import TacgiaCard from "../../../common/cards/tacgiacard/TacgiaCard";

const tacgias = [
    {
        tieuDe: "Nguyễn Nhật Ánh",
        imgSrc: "https://placehold.co/100x100", 
    },
    {
        tieuDe: "Haruki Murakami",
        imgSrc: "https://placehold.co/100x100",
    },
    {
        tieuDe: "J.K. Rowling",
        imgSrc: "https://placehold.co/100x100",
    },
    {
        tieuDe: "Nguyễn Huy Thiệp",
        imgSrc: "https://placehold.co/100x100",
    },
    {
        tieuDe: "Paulo Coelho",
        imgSrc: "https://placehold.co/100x100",
    },
    {
        tieuDe: "Paulo Coelho",
        imgSrc: "https://placehold.co/100x100",
    },
];

function ListTacgia() {
    return (
        <>
            {tacgias.map((tacgia, index) => (
                <TacgiaCard 
                    key={index}
                    tieuDe={tacgia.tieuDe}
                    imgSrc={tacgia.imgSrc}
                />
            ))}
        </>
    );
}

export default ListTacgia;
