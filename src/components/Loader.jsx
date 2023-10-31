import styles from "./Loader.module.css"

function Loader() {
    return (
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-center pt-[250px]">
           <div className={`${styles.loader}`}></div>
        </div>
    )
}

export default Loader
