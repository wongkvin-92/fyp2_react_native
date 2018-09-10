
import {Link} from 'react-router-native';

const LinkButton = ({to, title}) => (
    <Link
      component={TouchableOpacity}
      to={to}
    >
    <Text>{title}</Text>
    </Link>
  );

export default LinkButton;
