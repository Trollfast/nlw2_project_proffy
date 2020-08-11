import {StyleSheet} from 'react-native';

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
   },

   teacherList: {
       marginTop: -44,
   },

   serchForm:{
       marginTop: -18,
       marginBottom: 10,
   },

   label: {
       color: '#d4c2ff',
       fontFamily: 'Poppins_400Regular',
   },

   
   inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   },

   inputBlock: {
       width: '40%',
   },

   input: {
       height: 54,
       backgroundColor: '#fff',
       borderRadius: 8,
       justifyContent: 'center',
       paddingHorizontal: 16,
       marginTop: 4,
       marginBottom: 16,
   },

   submitButton: {
    backgroundColor: '#d4c2ff',
    flexDirection: 'row',
    height: 54,
    width: '14%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
},

submitButtonText: {

},


})

export default styles;