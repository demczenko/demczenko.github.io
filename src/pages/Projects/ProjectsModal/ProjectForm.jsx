import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import TablesToFulFill from "./TablesToFulFill";
import { useState } from "react";

const ProjectForm = ({ onSubmitForm, template_id }) => {
  const [columnsData, setColumnsData] = useState([
    {
      table_id: 1,
      columns_data: [
        {
          Slug: "de",
          "Offer part 1":
            "Shoppe für über 700 € und sicher dir deinen Wunsch-Teppich GRATIS.",
          "Offer part 2":
            "Verwende den Aktionscode beim Checkout, um dein Geschenk auszuwählen.",
          "Offer part 3": "Das Angebot gilt nur bis zum 14. Januar 2024",
          "Get code": "Code erhalten",
          "Choose from": "Zur Auswahl stehen:",
          "Intro title": "Neues Jahr, neuer Look",
          Intro:
            "Entdecke unsere stilvollen Lösungen, um deine Wohnräume zu organisieren und deine Produktivität zu steigern. Dank unserem riesigen Sortiment an Schreibtischen, Boxen, Körben und vielem mehr gelingt es dir, Ordnung zu schaffen.",
          "Title 1": "Bürotische",
          "Title 2": "Regale",
          "Title 3": "Kästen & Körbe",
          "Title 4": "Büroschränke",
          CTA: "Jetzt shoppen",
          "Soon ending": "Diese Kampagnen enden in Kürze",
        },
        {
          Slug: "uk",
          "Offer part 1":
            "Shop for min. £750 and get a rug of your choice for FREE.",
          "Offer part 2":
            "Add a promo code at the end of the check out to get your gift.",
          "Offer part 3": "The offer is valid until the 14th of January.",
          "Get code": "Get code",
          "Choose from": "Choose from:",
          "Intro title": "New Year, new space",
          Intro:
            "Discover our stylish solutions for organizing your space and boosting productivity. Dive into decluttering with our range of desks, boxes, baskets, and more.",
          "Title 1": "Desks",
          "Title 2": "Bookcases & Shelves",
          "Title 3": "Baskets & Containers",
          "Title 4": "Office Cabinets",
          CTA: "Shop now",
          "Soon ending": "Soon ending campaigns",
        },
        {
          Slug: "pl",
          "Offer part 1":
            "Złóż zamówienie za min. 2 800 zł i otrzymaj wybrany dywan ZA DARMO.",
          "Offer part 2":
            "Wpisz kod promocyjny w koszyku, aby otrzymać produkt gratis.",
          "Offer part 3": "Oferta obowiązuje do 14.01.2024 r.",
          "Get code": "Odbierz kod",
          "Choose from": "Wybierz spośród:",
          "Intro title": "Nowy Rok, nowe wnętrze",
          Intro:
            "Odkryj stylowe rozwiązania umożliwiające organizację przestrzeni i zwiększenie produktywności. Zainspiruj się i rozpocznij noworoczne porządki z naszymi biurkami, pudełkami, koszami i nie tylko.",
          "Title 1": "Biurka",
          "Title 2": "Regały",
          "Title 3": "Kosze i pudełka",
          "Title 4": "Szafki biurowe",
          CTA: "Kup teraz",
          "Soon ending": "Wkrótce kończące się kampanie",
        },
      ],
    },
    {
      table_id: 2,
      columns_data: [
        {
          Slug: "de",
          "Top image title":
            "https://beliani.info/newsletter/2022/de240101_01.jpg",
          "Top image": "https://upload.pictureserver.net/static/NWSL010124.gif",
        },
        {
          Slug: "uk",
          "Top image title":
            "https://beliani.info/newsletter/2022/uk240101_01.jpg",
          "Top image": "https://upload.pictureserver.net/static/NWSL010124.gif",
        },
        {
          Slug: "pl",
          "Top image title":
            "https://beliani.info/newsletter/2022/pl240101_01.jpg",
          "Top image": "https://upload.pictureserver.net/static/NWSL010124.gif",
        },
      ],
    },
  ]);
  const form = useForm({
    defaultValues: {
      project_name: "",
    },
  });

  const validateForm = (formData, cb) => {
    if (formData.project_name.length < 4) {
      form.setError("project_name", {
        message: "Project name must be at least 4 characters",
        type: "required",
      });
      return;
    }

    // if (!formData.tables_data) {
    //   form.setError("tables_data", {
    //     message: "Tables data is required.",
    //     type: "required",
    //   });
    //   return;
    // }

    cb(formData);
  };

  const onSubmit = (data) => {
    const project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: template_id,
    };

    onSubmitForm();
    console.log(project);
    console.log(columnsData);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => validateForm(data, onSubmit))}
          className="space-y-8">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="project name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on project card.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TablesToFulFill columnsData={columnsData} setColumnsData={setColumnsData} />
          <Button type="submit" size="sm">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProjectForm;
