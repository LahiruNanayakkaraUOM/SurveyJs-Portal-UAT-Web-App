import { images } from "../assets/images"

const NotFound = () => {
  return (
    <div style={{ height: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#333", padding: "1em" }}>
        <img
          alt="404 Not Found"
          src={images.notFound}
          style={{ marginBottom:"0.5em", width: "7em", maxWidth: "80%" }}
        />
      <h1 style={{ fontSize: "3.5em", fontWeight: "bold", margin: "0", textAlign: "center"}}>404 - Not Found</h1>
      <p style={{ textAlign: "center", fontSize: "1.05em", marginTop: "0"}}>Oops...! The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound