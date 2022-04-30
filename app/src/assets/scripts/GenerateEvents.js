import { CREATE_EVENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import Button from "../../materials/Button/Button";
const GenerateRandomEvents = () => {
  const [createEvent] = useMutation(CREATE_EVENT);
  const types = [
    "Action",
    "Info",
    "Problems",
    "Deliverables",
    "Risk",
    "Decision",
  ];
  const descriptions = [
    "Mauris pharetra vulputate volutpat. Proin mauris sem, pellentesque bibendum sem quis, posuere aliquet ex. Ut semper eu libero non pharetra. Cras sed tellus lacus. Sed vulputate ante vel commodo lobortis. Pellentesque quis odio vitae nisl cursus mollis. Nulla vel sodales dolor. Vestibulum orci justo, cursus non augue ut, volutpat ullamcorper enim. Morbi dignissim, velit facilisis mollis elementum, nunc arcu iaculis sem, vel dignissim dui lacus nec est. Donec dignissim neque at ex scelerisque ultrices. Nulla ultricies velit ac nisi cursus, nec pulvinar ex scelerisque.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra vulputate volutpat. Proin mauris sem, pellentesque bibendum sem quis, posuere aliquet ex. Ut semper eu libero non pharetra. Cras sed tellus lacus. Sed vulputate ante vel commodo lobortis. Pellentesque quis odio vitae nisl cursus mollis. Nulla vel sodales dolor. Vestibulum orci justo, cursus non augue ut, volutpat ullamcorper enim. Morbi dignissim, velit facilisis mollis elementum, nunc arcu iaculis sem, vel dignissim dui lacus nec est. Donec dignissim neque at ex scelerisque ultrices. Nulla ultricies velit ac nisi cursus, nec pulvinar ex scelerisque. Aenean nulla neque, feugiat eu efficitur et, commodo non sem.",
    "In imperdiet a nisl nec vehicula. Donec vestibulum mollis metus, sed consectetur ex venenatis sed. In sed nisl suscipit, fermentum mi sed, elementum quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam interdum, purus sit amet bibendum sagittis, massa magna fringilla dui, ac viverra mauris felis quis enim. Sed id urna ac est pellentesque auctor non eget urna. Maecenas id sollicitudin magna.",
    "Phasellus sit amet orci quis ipsum consectetur imperdiet. Vivamus eu arcu condimentum, aliquam dolor sed, finibus massa. Vestibulum fermentum tellus id sagittis egestas. Aliquam erat volutpat. Aliquam dictum finibus tristique. Nunc dignissim eros odio, eget bibendum arcu ornare sit amet. In dapibus imperdiet lectus, ac semper leo pulvinar eu. Vestibulum aliquam mattis lectus, id semper nisl cursus id. Nullam augue leo, tempus vitae erat eget, egestas viverra enim. Aenean at tortor tristique, aliquet sapien commodo, dapibus risus. In sollicitudin sem faucibus dui faucibus consequat. Praesent at mi sit amet diam accumsan euismod. Curabitur ac condimentum lacus. Nulla placerat lacus elit, a sollicitudin enim maximus sed. Sed a lorem porttitor, imperdiet lectus nec, porta enim.",
    "In eget ultrices ligula, vel efficitur magna. Sed fermentum tortor vitae nisl auctor, molestie imperdiet risus aliquam. Cras vitae metus lorem. Proin rhoncus porta convallis. Proin eu elit eget massa vestibulum fermentum vel sed urna. Pellentesque enim risus, gravida ut sapien in, ullamcorper tempor augue. Integer ornare semper tempus. Sed blandit tincidunt ex eu dapibus. Ut ullamcorper eros leo, facilisis finibus risus sollicitudin at.",
  ];
  const users = [
    "002734c5-8f48-4c39-bd74-afe08ad93ad2",
    "3be1f1f0-0bf5-49ba-82c2-4f7a1cb7f18f",
    "c386756e-ea3d-4ac7-9db6-cc7c57ba690a",
    "e0b3046d-7905-44b9-b151-af04c26fd2d7",
  ];
  const projects = [
    "1053ab1c-c654-4354-a910-33ba4a8519ec",
    "6fc8643b-d34f-4018-b6b3-ce09aee3aa47",
    "ab500e95-3f30-46ca-be0f-e36277280ca9",
    "d55e77b2-6cc1-450e-9ed8-269e31016f9c",
    "fde302c9-3d68-4bc2-9130-1c7b60aed067",
  ];
  const periods = ["Y22W18", "Y22W17", "Y22W16"];

  const statuses = [
    "En cours",
    "Nouveau",
    "Décalage date",
    "À planifier",
    "Réalisé",
  ];
  const createRandomEvent = async (
    type,
    projectId,
    creatorId,
    description,
    contributorIds,
    status,
    period
  ) => {
    try {
      await createEvent({
        variables: {
          type: type,
          projectId: projectId,
          creatorId: creatorId,
          description: description,
          contributors: contributorIds,
          status: status,
          period: period,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const generate = (number) => {
    for (let i = 0; i < number; i++) {
      const contributors = [users[Math.floor(Math.random() * users.length)]];
      const type = types[Math.floor(Math.random() * types.length)];
      const projectId = projects[Math.floor(Math.random() * projects.length)];
      const creatorId = users[Math.floor(Math.random() * users.length)];
      const description =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const period = periods[Math.floor(Math.random() * periods.length)];
      createRandomEvent(
        type,
        projectId,
        creatorId,
        description,
        contributors,
        status,
        period
      );
    }
  };

  return <Button onClick={() => generate(120)}>Générer des exemples</Button>;
};
export default GenerateRandomEvents;
