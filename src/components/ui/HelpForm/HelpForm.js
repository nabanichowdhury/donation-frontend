"use client";

import { createRequest } from "@/lib/utils/createRequest";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const input = "input input-bordered w-full rounded-xl";

const textarea =
  "textarea textarea-bordered w-full rounded-xl min-h-32 resize-y";
const select = "select select-bordered w-full rounded-xl";

const helpInputs = [
  {
    title: "Subject",
    name: "subject",
    type: "text",
    options: null,
    class: input,
  },
  {
    title: "Category",
    name: "category",
    type: "select",
    class: select,
    options: [
      {
        title: "Health",
        value: "health",
      },
      {
        title: "Food",
        value: "food",
      },
      {
        title: "Education",
        value: "education",
      },
      {
        title: "Clothing",
        value: "clothing",
      },
    ],
  },
  {
    title: "Email",
    name: "email",
    type: "email",
    options: null,
    class: input,
  },

  {
    title: "Description",
    name: "description",
    type: "textarea",
    options: null,
    class: textarea,
  },
];

const HelpForm = () => {
  const { register, handleSubmit, getValues, reset } = useForm();

  const handleSubmitForm = async (payload) => {
    payload.hasRead = false;
    const res = await createRequest(payload);

    if (res.success) {
      toast.success("Request created successfully");
      const serviceId = "service_60fiu6i";
      const templateId = "template_kymh59t";
      const publicKeys = "SXleEXDE2HQx-0EzG";
      const email = res.email;
      const subject = `Your request for category ${payload.category} has been created`;

      emailjs
        .send(
          serviceId,
          templateId,
          {
            subject: subject,
            to_email: payload.email,
          },
          publicKeys
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    } else {
      toast.error("Failed to create request");
    }
    reset({
      subject: "",
      email: "",
      description: "",
    });
  };
  return (
    <>
      <div className="flex flex-col gap-5 w-full max-w-[600px] p-5 md:p-12 rounded-xl md:rounded-5xl bg-white shadow-xl">
        <h4 className="text-3xl font-bold text-center mb-5">Help Form</h4>
        {helpInputs.map((item) => {
          return (
            <div key={item.name} className="">
              <h4 className="mb-2">{item.title}</h4>
              {item.type !== "select" && item.type !== "textarea" && (
                <input
                  {...register(item.name, {
                    required: `${item.title} is required.`,
                  })}
                  type={item.type}
                  placeholder={item.title}
                  className={item.class}
                />
              )}
              {item.type === "select" && (
                <select
                  {...register(item.name, {
                    required: `${item.title} is required.`,
                  })}
                  className={item.class}
                >
                  {item.options !== null &&
                    item.options.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                        className="py-3 h-11"
                      >
                        {category.title}
                      </option>
                    ))}
                </select>
              )}
              {item.type === "textarea" && (
                <textarea
                  {...register(item.name, {
                    required: `${item.title} is required.`,
                  })}
                  className={item.class}
                  placeholder={item.title}
                />
              )}
            </div>
          );
        })}
        <button
          onClick={handleSubmit(handleSubmitForm)}
          className="btn bg-pink-400 text-white hover:bg-green-400 rounded-xl"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default HelpForm;
