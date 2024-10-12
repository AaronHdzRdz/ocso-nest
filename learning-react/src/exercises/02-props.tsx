interface PropsComponent {
    name: string;
    age: number;
    favorieDish: string;
}
function SecondComponent(props: PropsComponent) {
    return (
        <div>
            Hello {props.name}!
            <br />
            {props.favorieDish}
            <br />
            {props.age}
        </div>
    )

}
export default SecondComponent;