require('dotenv').config();

const { OpenAI } = require('openai');
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey
});



//make call to chat gpt. need name, mbti, ONE interest
const generateAdvice = async(name, mbti, topic) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: `You are an Advice Columnist who's giving advice to ${name} based on their Myers Briggs Indicator Type. This person this an ${mbti} type. Can you give them some advice regarding ${topic}? Please format the advice as a letter and sign it as Unlock Epiphany.`}],
    model: 'gpt-3.5-turbo',
  });

  const advice = completion.choices[0];
  console.log(advice);
  return advice;

};

// generateAdvice('Vicky', 'INFJ', 'Networking');

module.exports = {
  generateAdvice
}

/*
const mockAdvice = {
  index: 0,
  message: {
    role: 'assistant',
    content: `Dear ${name},\n' +
      '\n' +
      'As an ${mbti}, you tend to be introverted and value deep connections with others. ${topic} may seem daunting, but it can be a beneficial way to expand your horizons and establish meaningful professional relationships. Here are a few tips to help you navigate the world of ${topic}:\n' +
      '\n' +
      '1. Find events aligned with your interests: Seek out ${topic} events that cater to your passions and areas of expertise. Connecting with individuals who share common interests will make it easier for you to engage in meaningful conversations and build genuine connections.\n' +
      '\n' +
      '2. Take the time to prepare: Before attending an event or meeting, do your research. Learn about the individuals or organizations you want to connect with. This preparation will help you feel more confident and allow for more meaningful conversations when you meet them.\n' +
      '\n' +
      '3. Focus on quality over quantity: As an INFJ, you value depth and authenticity in your relationships, and this trait can shine through in networking situations. Focus on building genuine connections with a few individuals rather than trying to connect with a large number of people superficially. Deep connections can lead to more meaningful opportunities.\n' +
      '\n' +
      '4. Utilize your listening skills: One of your strengths as an ${mbti} is your ability to listen actively and empathetically. Use this skill to your advantage during networking events. Ask thoughtful questions, actively listen to the responses, and show genuine interest in the other person. This will help you establish deeper connections.\n' +
      '\n' +
      "5. Follow up: ${topic} doesn't end at the event. Take the initiative to follow up with the people you meet. Send a personalized email expressing your appreciation for the conversation and expressing your desire to stay connected. This will reinforce the connection and show that you value the relationship.\n" +
      '\n' +
      'Remember, ${topic} is not about self-promotion but rather about building authentic relationships. By staying true to your ${mbti} nature and focusing on quality connections, networking can become a powerful tool for professional growth and personal development.\n' +
      '\n' +
      'Best of luck on your ${topic} journey!\n' +
      '\n' +
      'Warm regards,\n' +
      'Unlock Epiphany`
  },
  finish_reason: 'stop'
}
*/


/*RETURN VALUE:
{
  index: 0,
  message: {
    role: 'assistant',
    content: 'Dear Vicky,\n' +
      '\n' +
      'As an INFJ, you tend to be introverted and value deep connections with others. Networking may seem daunting, but it can be a beneficial way to expand your horizons and establish meaningful professional relationships. Here are a few tips to help you navigate the world of networking:\n' +
      '\n' +
      '1. Find events aligned with your interests: Seek out networking events that cater to your passions and areas of expertise. Connecting with individuals who share common interests will make it easier for you to engage in meaningful conversations and build genuine connections.\n' +
      '\n' +
      '2. Take the time to prepare: Before attending an event or meeting, do your research. Learn about the individuals or organizations you want to connect with. This preparation will help you feel more confident and allow for more meaningful conversations when you meet them.\n' +
      '\n' +
      '3. Focus on quality over quantity: As an INFJ, you value depth and authenticity in your relationships, and this trait can shine through in networking situations. Focus on building genuine connections with a few individuals rather than trying to connect with a large number of people superficially. Deep connections can lead to more meaningful opportunities.\n' +
      '\n' +
      '4. Utilize your listening skills: One of your strengths as an INFJ is your ability to listen actively and empathetically. Use this skill to your advantage during networking events. Ask thoughtful questions, actively listen to the responses, and show genuine interest in the other person. This will help you establish deeper connections.\n' +
      '\n' +
      "5. Follow up: Networking doesn't end at the event. Take the initiative to follow up with the people you meet. Send a personalized email expressing your appreciation for the conversation and expressing your desire to stay connected. This will reinforce the connection and show that you value the relationship.\n" +
      '\n' +
      'Remember, networking is not about self-promotion but rather about building authentic relationships. By staying true to your INFJ nature and focusing on quality connections, networking can become a powerful tool for professional growth and personal development.\n' +
      '\n' +
      'Best of luck on your networking journey!\n' +
      '\n' +
      'Warm regards,\n' +
      '[Your Name]'
  },
  finish_reason: 'stop'
}


*/

