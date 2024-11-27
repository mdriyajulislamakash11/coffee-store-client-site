import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, chef, supplier, taste, category, details, photo } = coffee;

  const handleDelete = () => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });
              const remaingn = coffees.filter(cof => cof._id !== _id);
              setCoffees(remaingn);
            }
          });
      }
    });
  };

  console.log("Photo URL:", photo);

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo || "https://via.placeholder.com/150"} alt="Coffee" />
      </figure>
      <div className="flex items-center justify-between w-full px-4">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>{chef}</p>
          <p>{supplier}</p>
          <p>{taste}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-3">
            <button className="btn join-item btn-neutral text-white">
              View
            </button>
            <Link to={`/updateCoffee/${_id}`}>
              <button className="btn join-item btn-neutral text-white">
                Edite
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="btn join-item btn-neutral text-white bg-red-400"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
