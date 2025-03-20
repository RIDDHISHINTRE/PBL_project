
export default function Card(props) {
  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      {props.children}
    </div>
  );
}

