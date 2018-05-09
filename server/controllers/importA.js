import B from './importB';

const A = () => {
    B();
    console.log('执行完毕');
};
A();

export default A;
